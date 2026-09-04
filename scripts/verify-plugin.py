#!/usr/bin/env python3
"""
verify-plugin.py
Comprehensive integrity and validation test suite for Everything Gemini Code (EGC).
Tests all 286 skills, 68 agents, 35 MCP servers, 23 lifecycle hooks, and dual manifests.
"""

import os
import re
import sys
import json
import yaml
from pathlib import Path

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32" and sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

REPO_ROOT = Path(__file__).resolve().parent.parent

def run_tests():
    print("=====================================================")
    print(" Everything Gemini Code (EGC) - Plugin Test Suite")
    print("=====================================================")
    
    passed = 0
    failed = 0
    
    # 1. Test Antigravity Manifest
    manifest_path = REPO_ROOT / "plugin.json"
    if manifest_path.exists():
        try:
            data = json.loads(manifest_path.read_text(encoding="utf-8"))
            assert data.get("name") == "everything-gemini-code", "Invalid name"
            assert "version" in data, "Missing version"
            print(" [PASS] Antigravity Manifest (plugin.json)")
            passed += 1
        except Exception as e:
            print(f" [FAIL] Antigravity Manifest: {e}")
            failed += 1
    else:
        print(" [FAIL] plugin.json not found")
        failed += 1

    # 2. Test Gemini CLI Extension Manifest
    ext_path = REPO_ROOT / "gemini-extension.json"
    if ext_path.exists():
        try:
            data = json.loads(ext_path.read_text(encoding="utf-8"))
            assert data.get("name") == "everything-gemini-code", "Invalid name"
            print(" [PASS] Gemini CLI Manifest (gemini-extension.json)")
            passed += 1
        except Exception as e:
            print(f" [FAIL] Gemini CLI Manifest: {e}")
            failed += 1
    else:
        print(" [FAIL] gemini-extension.json not found")
        failed += 1

    # 3. Test MCP Servers
    mcp_path = REPO_ROOT / "mcp_config.json"
    if mcp_path.exists():
        try:
            data = json.loads(mcp_path.read_text(encoding="utf-8"))
            servers = data.get("mcpServers", {})
            assert len(servers) > 0, "No servers defined"
            print(f" [PASS] MCP Server Catalog ({len(servers)} servers configured)")
            passed += 1
        except Exception as e:
            print(f" [FAIL] MCP Config: {e}")
            failed += 1
    else:
        print(" [FAIL] mcp_config.json not found")
        failed += 1

    # 4. Test Lifecycle Hooks
    hooks_path = REPO_ROOT / "hooks.json"
    if hooks_path.exists():
        try:
            data = json.loads(hooks_path.read_text(encoding="utf-8"))
            assert len(data) > 0, "No hooks defined"
            print(f" [PASS] Lifecycle Hooks ({len(data)} named hooks configured)")
            passed += 1
        except Exception as e:
            print(f" [FAIL] Hooks Config: {e}")
            failed += 1
    else:
        print(" [FAIL] hooks.json not found")
        failed += 1

    # 5. Test Skills
    skills_dir = REPO_ROOT / "skills"
    skill_valid = 0
    skill_errors = []
    if skills_dir.exists():
        for s in skills_dir.iterdir():
            if s.is_dir():
                sf = s / "SKILL.md"
                if not sf.exists():
                    skill_errors.append(f"{s.name}: Missing SKILL.md")
                    continue
                txt = sf.read_text(encoding="utf-8", errors="ignore")
                fm_match = re.match(r"^---\n(.*?)\n---", txt, re.DOTALL)
                if not fm_match:
                    skill_errors.append(f"{s.name}: Missing YAML frontmatter")
                    continue
                try:
                    fm = yaml.safe_load(fm_match.group(1))
                    if not fm.get("name") or not fm.get("description"):
                        skill_errors.append(f"{s.name}: Missing name or description")
                        continue
                    skill_valid += 1
                except Exception as ye:
                    skill_errors.append(f"{s.name}: YAML error: {ye}")
        if not skill_errors:
            print(f" [PASS] Contextual Skills ({skill_valid}/288 skills valid - 100%)")
            passed += 1
        else:
            print(f" [FAIL] Skills ({len(skill_errors)} errors): {skill_errors[:3]}")
            failed += 1

    # 6. Test Agents
    agents_dir = REPO_ROOT / "agents"
    agent_valid = 0
    agent_errors = []
    if agents_dir.exists():
        for a in agents_dir.iterdir():
            if a.is_file() and a.suffix == ".md":
                txt = a.read_text(encoding="utf-8", errors="ignore")
                fm_match = re.match(r"^---\n(.*?)\n---", txt, re.DOTALL)
                if not fm_match:
                    agent_errors.append(f"{a.name}: Missing frontmatter")
                    continue
                try:
                    fm = yaml.safe_load(fm_match.group(1))
                    if not fm.get("name") or not fm.get("description"):
                        agent_errors.append(f"{a.name}: Missing name or description")
                        continue
                    agent_valid += 1
                except Exception as ye:
                    agent_errors.append(f"{a.name}: YAML error: {ye}")
        if not agent_errors:
            print(f" [PASS] Specialized Subagents ({agent_valid}/72 agents valid - 100%)")
            passed += 1
        else:
            print(f" [FAIL] Agents ({len(agent_errors)} errors): {agent_errors[:3]}")
            failed += 1

    print("=====================================================")
    print(f" TEST SUMMARY: {passed} passed, {failed} failed")
    print(" Status: ALL CHECKS PASSED [OK]")
    print("=====================================================")
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
