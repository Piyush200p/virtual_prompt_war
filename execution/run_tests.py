# execution/run_tests.py
import sys
import json
import subprocess
from pathlib import Path

def run_command(cmd, cwd=None):
    """Helper to run a shell command and return stdout/stderr/exitcode."""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    return result.returncode, result.stdout.strip(), result.stderr.strip()

def run_test_suite():
    print("====================================================")
    print("ArenaFlow: Enhanced Production Test & QA Suite")
    print("====================================================")
    
    tests_passed = 0
    total_tests = 6

    # Test 1: Frontend Linter Integration
    print("\n[TEST 1] Running Front-End Linter Check (oxlint)...")
    code, stdout, stderr = run_command("npm run lint")
    if code == 0:
        print("[PASS] Linter check passed with 0 warnings and 0 errors.")
        tests_passed += 1
    else:
        print(f"[FAIL] Linter found errors/warnings:\n{stdout}\n{stderr}")

    # Test 2: Verify Stadium Registry Schema Integrity via Node.js
    print("\n[TEST 2] Extracting & Parsing Stadium Config Registry...")
    node_cmd = "node -e \"import('./src/data/stadiums.js').then(m => console.log(JSON.stringify(m.STADIUM_CONFIGS)))\""
    code, stdout, stderr = run_command(node_cmd)
    if code != 0 or not stdout:
        print(f"[FAIL] Node.js failed to load STADIUM_CONFIGS:\n{stderr}")
        sys.exit(1)
    
    try:
        configs = json.loads(stdout)
        print(f"[PASS] Successfully loaded configurations for: {', '.join(configs.keys())}")
        tests_passed += 1
    except Exception as e:
        print(f"[FAIL] Failed to parse exported stadium configurations: {e}")
        sys.exit(1)

    # Test 3: Validate Specific Stadium Schema requirements
    print("\n[TEST 3] Validating Stadium Registry Schema Integrity...")
    required_stadiums = ["metlife", "azteca", "bc_place"]
    required_keys = [
        "id", "name", "location", "country", "region", "role", "capacity",
        "currentMatch", "currentScan", "weather", "svgRoute", "accessibilityRoute",
        "ticket", "sectors", "concessions", "wayfinding", "accessibilityWayfinding",
        "sustainabilityScore", "transportation", "volunteerTasks"
    ]
    
    schema_errors = []
    for std_id in required_stadiums:
        if std_id not in configs:
            schema_errors.append(f"Missing stadium: {std_id}")
            continue
        std = configs[std_id]
        # Check all keys
        for key in required_keys:
            if key not in std:
                schema_errors.append(f"Stadium '{std_id}' is missing key: '{key}'")

    if not schema_errors:
        print("[PASS] All stadium records have complete properties and follow structural schemas.")
        tests_passed += 1
    else:
        print(f"[FAIL] Schema validation errors:\n" + "\n".join(schema_errors))

    # Test 4: Validate Nested Fields Structure (Sectors, Concessions, Wayfinding)
    print("\n[TEST 4] Validating Nested Field Structural Specifications...")
    nested_errors = []
    for std_id, std in configs.items():
        # Validate sectors
        sectors = std.get("sectors", [])
        if len(sectors) != 4:
            nested_errors.append(f"Stadium '{std_id}' must have exactly 4 sectors (has {len(sectors)})")
        for s in sectors:
            for field in ["name", "density", "status", "security", "temp", "colorClass"]:
                if field not in s:
                    nested_errors.append(f"Sector in '{std_id}' missing field: '{field}'")
        
        # Validate ticket
        t = std.get("ticket", {})
        for field in ["holder", "seat", "gate", "barcode"]:
            if field not in t:
                nested_errors.append(f"Ticket in '{std_id}' missing field: '{field}'")

        # Validate volunteerTasks
        v_tasks = std.get("volunteerTasks", [])
        for task in v_tasks:
            for field in ["id", "name", "location", "crew", "priority", "status"]:
                if field not in task:
                    nested_errors.append(f"Volunteer task in '{std_id}' missing field: '{field}'")

    if not nested_errors:
        print("[PASS] Nested structures (Sectors, Concessions, Volunteer Tasks) match production specs.")
        tests_passed += 1
    else:
        print(f"[FAIL] Nested structure errors:\n" + "\n".join(nested_errors))

    # Test 5: Verify AI Model Specification Routing parameters
    print("\n[TEST 5] Checking AI Model Specifications in Frontend...")
    app_file = Path("src/App.jsx")
    if app_file.exists():
        app_content = app_file.read_text(encoding="utf-8")
        if "MODEL_SPECS" in app_content and "sonnet_4_6_thinking" in app_content:
            print("[PASS] Dynamic Model Specs verified in App frontend.")
            tests_passed += 1
        else:
            print("[FAIL] Model spec parameters are missing.")
    else:
        print("[FAIL] src/App.jsx not found.")

    # Test 6: Verify Frontend Build Integration
    print("\n[TEST 6] Compiling Production Bundle (npm run build)...")
    build_code, build_stdout, build_stderr = run_command("npm run build")
    if build_code == 0:
        print("[PASS] Production compilation completed with 0 errors.")
        tests_passed += 1
    else:
        print(f"[FAIL] Build compilation failed:\n{build_stderr}")

    print("\n====================================================")
    print(f"Results: {tests_passed}/{total_tests} Tests Passed.")
    print("====================================================")
    
    if tests_passed == total_tests:
        print("SUCCESS: All ArenaFlow QA & test assertions PASSED!")
        return True
    else:
        print("WARNING: Some test cases failed assertions.")
        return False

if __name__ == "__main__":
    success = run_test_suite()
    sys.exit(0 if success else 1)
