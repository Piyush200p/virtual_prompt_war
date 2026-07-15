import unittest
import os
import re

class TestStadiums(unittest.TestCase):
    def test_stadiums_file_exists(self):
        file_path = os.path.join("src", "data", "stadiums.js")
        self.assertTrue(os.path.exists(file_path), "stadiums.js file must exist")
        
    def test_stadiums_contains_configs(self):
        file_path = os.path.join("src", "data", "stadiums.js")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("STADIUM_CONFIGS", content, "STADIUM_CONFIGS must be declared in stadiums.js")
        
    def test_stadium_configs_integrity(self):
        file_path = os.path.join("src", "data", "stadiums.js")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("metlife:", content, "MetLife config should exist")
        self.assertIn("azteca:", content, "Azteca config should exist")
        self.assertIn("bc_place:", content, "BC Place config should exist")

if __name__ == "__main__":
    unittest.main()
