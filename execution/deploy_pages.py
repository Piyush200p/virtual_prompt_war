#!/usr/bin/env python3
import os
import subprocess
import sys
import shutil

def run_cmd(args, cwd=None, check=True):
    print(f"Executing: {' '.join(args)} in {cwd or os.getcwd()}")
    result = subprocess.run(args, cwd=cwd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if check and result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
        sys.exit(result.returncode)
    return result.stdout.strip()

def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(project_dir)

    print("=== Step 1: Getting Git Remote URL ===")
    remote_url = run_cmd(["git", "remote", "get-url", "origin"])
    print(f"Remote repository URL: {remote_url}")

    print("\n=== Step 2: Compiling Project (Vite Production Build) ===")
    run_cmd(["npm", "run", "build"])

    dist_dir = os.path.join(project_dir, "dist")
    if not os.path.exists(dist_dir):
        print("Error: build output directory 'dist/' does not exist.")
        sys.exit(1)

    print("\n=== Step 3: Initializing Deployment Repo in dist/ ===")
    dist_git_dir = os.path.join(dist_dir, ".git")
    if os.path.exists(dist_git_dir):
        import stat
        def remove_readonly(func, path, excinfo):
            try:
                os.chmod(path, stat.S_IWRITE)
                func(path)
            except Exception as e:
                print(f"Warn: failed to remove {path}: {e}")
        try:
            shutil.rmtree(dist_git_dir, onexc=remove_readonly)
        except TypeError:
            shutil.rmtree(dist_git_dir, onerror=remove_readonly)

    run_cmd(["git", "init"], cwd=dist_dir)
    run_cmd(["git", "checkout", "-b", "main"], cwd=dist_dir)
    run_cmd(["git", "add", "-A"], cwd=dist_dir)
    run_cmd(["git", "commit", "-m", "Manual deploy from local workspace via deploy_pages.py"], cwd=dist_dir)

    print("\n=== Step 4: Force-Pushing to gh-pages branch ===")
    run_cmd(["git", "push", "-f", remote_url, "main:gh-pages"], cwd=dist_dir)

    print("\n=== Success! Site pushed directly to gh-pages branch ===")
    print("GitHub Pages will now refresh with the new build in 10-30 seconds.")

if __name__ == "__main__":
    main()
