"""
Unit tests for the inventory management functions in test.py.

测试目标:
  - displayInventory(inventory) — 打印并统计库存总量
  - addToInventory(inventory, addedItems) — 添加掉落物品到库存

运行方式:
  python -m pytest test_inventory.py -v
  python -m unittest test_inventory.py -v
"""

import io
import sys
import unittest

# 导入被测试的函数
from test import addToInventory  # type: ignore


class TestAddToInventory(unittest.TestCase):
    """测试 addToInventory 函数 — 物品添加逻辑"""

    def setUp(self):
        """每个测试用例运行前，重置初始库存"""
        self.base_inv = {"gold coin": 42, "rope": 1}

    def test_add_new_item(self):
        """新增物品：库存中不存在的物品应被添加并计为 1"""
        result = addToInventory(self.base_inv.copy(), ["ruby"])
        self.assertEqual(result["ruby"], 1)

    def test_add_existing_item(self):
        """累加已有物品：库存中已存在的物品数量应递增"""
        result = addToInventory(self.base_inv.copy(), ["gold coin"])
        self.assertEqual(result["gold coin"], 43)

    def test_add_multiple_items(self):
        """混合掉落：同时包含新旧物品，均应正确处理"""
        loot = ["gold coin", "dagger", "gold coin", "gold coin", "ruby"]
        result = addToInventory(self.base_inv.copy(), loot)
        self.assertEqual(result["gold coin"], 45)  # 42 + 3
        self.assertEqual(result["dagger"], 1)
        self.assertEqual(result["ruby"], 1)
        self.assertEqual(result["rope"], 1)  # 未受影响

    def test_empty_loot_list(self):
        """空掉落列表：库存应保持不变"""
        result = addToInventory(self.base_inv.copy(), [])
        self.assertEqual(result, self.base_inv)

    def test_original_inventory_not_mutated(self):
        """不应修改传入的原始字典（如果实现是返回新字典的话）。
        注意：当前实现直接修改并返回传入的字典，此测试记录当前行为。"""
        original = self.base_inv.copy()
        _ = addToInventory(original, ["sword"])
        # 当前实现会就地修改
        self.assertIn("sword", original)


class TestDisplayInventory(unittest.TestCase):
    """测试 displayInventory 函数 — 输出格式验证"""

    def setUp(self):
        """准备一个已知库存用于输出验证"""
        self.inventory = {"rope": 1, "torch": 6, "gold coin": 42, "dagger": 1, "arrow": 12}

    def test_output_contains_all_items(self):
        """输出应包含所有物品及其数量"""
        output = self._capture_display(self.inventory)
        for item, count in self.inventory.items():
            self.assertIn(f"{count} {item}", output)

    def test_output_contains_total(self):
        """输出应包含正确的物品总数"""
        output = self._capture_display(self.inventory)
        total = sum(self.inventory.values())
        self.assertIn(f"Total number of items: {total}", output)

    def test_output_starts_with_inventory_header(self):
        """输出应以 'Inventory:' 开头"""
        output = self._capture_display(self.inventory)
        self.assertTrue(output.startswith("Inventory:"))

    def test_empty_inventory(self):
        """空库存：总数应为 0"""
        output = self._capture_display({})
        self.assertIn("Total number of items: 0", output)

    # ----- helper -----
    @staticmethod
    def _capture_display(inventory: dict) -> str:
        """捕获 displayInventory 的 stdout 输出为字符串"""
        from test import displayInventory

        captured = io.StringIO()
        sys.stdout = captured
        try:
            displayInventory(inventory)
        finally:
            sys.stdout = sys.__stdout__
        return captured.getvalue()


if __name__ == "__main__":
    unittest.main(verbosity=2)
