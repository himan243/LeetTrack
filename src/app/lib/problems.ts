export type Problem = {
  id: number
  title: string
  slug: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
  tags: string[]
}

export const problems: Problem[] = [
  // Arrays & Hashing
  { id: 1, title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table'] },
  { id: 217, title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Easy', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table'] },
  { id: 242, title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'Easy', topic: 'Arrays & Hashing', tags: ['Hash Table', 'String'] },
  { id: 49, title: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table', 'String'] },
  { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table', 'Heap'] },
  { id: 238, title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'Prefix Sum'] },
  { id: 128, title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table'] },
  { id: 36, title: 'Valid Sudoku', slug: 'valid-sudoku', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'Hash Table', 'Matrix'] },
  { id: 271, title: 'Encode and Decode Strings', slug: 'encode-and-decode-strings', difficulty: 'Medium', topic: 'Arrays & Hashing', tags: ['Array', 'String'] },

  // Two Pointers
  { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome', difficulty: 'Easy', topic: 'Two Pointers', tags: ['String', 'Two Pointers'] },
  { id: 167, title: 'Two Sum II', slug: 'two-sum-ii-input-array-is-sorted', difficulty: 'Medium', topic: 'Two Pointers', tags: ['Array', 'Binary Search', 'Two Pointers'] },
  { id: 15, title: '3Sum', slug: '3sum', difficulty: 'Medium', topic: 'Two Pointers', tags: ['Array', 'Sorting', 'Two Pointers'] },
  { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'Medium', topic: 'Two Pointers', tags: ['Array', 'Greedy', 'Two Pointers'] },
  { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', topic: 'Two Pointers', tags: ['Array', 'DP', 'Stack', 'Two Pointers'] },

  // Sliding Window
  { id: 121, title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', topic: 'Sliding Window', tags: ['Array', 'DP'] },
  { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'Medium', topic: 'Sliding Window', tags: ['Hash Table', 'Sliding Window', 'String'] },
  { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'Medium', topic: 'Sliding Window', tags: ['Hash Table', 'Sliding Window', 'String'] },
  { id: 567, title: 'Permutation in String', slug: 'permutation-in-string', difficulty: 'Medium', topic: 'Sliding Window', tags: ['Hash Table', 'Sliding Window', 'String'] },
  { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Hard', topic: 'Sliding Window', tags: ['Hash Table', 'Sliding Window', 'String'] },
  { id: 239, title: 'Sliding Window Maximum', slug: 'sliding-window-maximum', difficulty: 'Hard', topic: 'Sliding Window', tags: ['Array', 'Deque', 'Sliding Window'] },

  // Stack
  { id: 20, title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', topic: 'Stack', tags: ['Stack', 'String'] },
  { id: 155, title: 'Min Stack', slug: 'min-stack', difficulty: 'Medium', topic: 'Stack', tags: ['Design', 'Stack'] },
  { id: 150, title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', difficulty: 'Medium', topic: 'Stack', tags: ['Array', 'Math', 'Stack'] },
  { id: 22, title: 'Generate Parentheses', slug: 'generate-parentheses', difficulty: 'Medium', topic: 'Stack', tags: ['Backtracking', 'Dynamic Programming', 'String'] },
  { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures', difficulty: 'Medium', topic: 'Stack', tags: ['Array', 'Monotonic Stack', 'Stack'] },
  { id: 853, title: 'Car Fleet', slug: 'car-fleet', difficulty: 'Medium', topic: 'Stack', tags: ['Array', 'Monotonic Stack', 'Sorting', 'Stack'] },
  { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram', difficulty: 'Hard', topic: 'Stack', tags: ['Array', 'Monotonic Stack', 'Stack'] },

  // Binary Search
  { id: 704, title: 'Binary Search', slug: 'binary-search', difficulty: 'Easy', topic: 'Binary Search', tags: ['Array', 'Binary Search'] },
  { id: 74, title: 'Search a 2D Matrix', slug: 'search-a-2d-matrix', difficulty: 'Medium', topic: 'Binary Search', tags: ['Array', 'Binary Search', 'Matrix'] },
  { id: 875, title: 'Koko Eating Bananas', slug: 'koko-eating-bananas', difficulty: 'Medium', topic: 'Binary Search', tags: ['Array', 'Binary Search'] },
  { id: 153, title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', difficulty: 'Medium', topic: 'Binary Search', tags: ['Array', 'Binary Search'] },
  { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium', topic: 'Binary Search', tags: ['Array', 'Binary Search'] },
  { id: 981, title: 'Time Based Key-Value Store', slug: 'time-based-key-value-store', difficulty: 'Medium', topic: 'Binary Search', tags: ['Binary Search', 'Design', 'Hash Table'] },
  { id: 4, title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'Hard', topic: 'Binary Search', tags: ['Array', 'Binary Search', 'Divide and Conquer'] },

  // Linked List
  { id: 206, title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy', topic: 'Linked List', tags: ['Linked List', 'Recursion'] },
  { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', topic: 'Linked List', tags: ['Linked List', 'Recursion'] },
  { id: 141, title: 'Linked List Cycle', slug: 'linked-list-cycle', difficulty: 'Easy', topic: 'Linked List', tags: ['Hash Table', 'Linked List', 'Two Pointers'] },
  { id: 143, title: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium', topic: 'Linked List', tags: ['Linked List', 'Recursion', 'Stack', 'Two Pointers'] },
  { id: 19, title: 'Remove Nth Node From End of List', slug: 'remove-nth-node-from-end-of-list', difficulty: 'Medium', topic: 'Linked List', tags: ['Linked List', 'Two Pointers'] },
  { id: 138, title: 'Copy List with Random Pointer', slug: 'copy-list-with-random-pointer', difficulty: 'Medium', topic: 'Linked List', tags: ['Hash Table', 'Linked List'] },
  { id: 2, title: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Medium', topic: 'Linked List', tags: ['Linked List', 'Math', 'Recursion'] },
  { id: 287, title: 'Find the Duplicate Number', slug: 'find-the-duplicate-number', difficulty: 'Medium', topic: 'Linked List', tags: ['Array', 'Binary Search', 'Bit Manipulation', 'Two Pointers'] },
  { id: 146, title: 'LRU Cache', slug: 'lru-cache', difficulty: 'Medium', topic: 'Linked List', tags: ['Design', 'Doubly-Linked List', 'Hash Table', 'Linked List'] },
  { id: 23, title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', topic: 'Linked List', tags: ['Divide and Conquer', 'Heap', 'Linked List', 'Merge Sort'] },
  { id: 25, title: 'Reverse Nodes in k-Group', slug: 'reverse-nodes-in-k-group', difficulty: 'Hard', topic: 'Linked List', tags: ['Linked List', 'Recursion'] },

  // Trees
  { id: 226, title: 'Invert Binary Tree', slug: 'invert-binary-tree', difficulty: 'Easy', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 104, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'Easy', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 543, title: 'Diameter of Binary Tree', slug: 'diameter-of-binary-tree', difficulty: 'Easy', topic: 'Trees', tags: ['Binary Tree', 'DFS', 'Tree'] },
  { id: 110, title: 'Balanced Binary Tree', slug: 'balanced-binary-tree', difficulty: 'Easy', topic: 'Trees', tags: ['Binary Tree', 'DFS', 'Tree'] },
  { id: 100, title: 'Same Tree', slug: 'same-tree', difficulty: 'Easy', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 572, title: 'Subtree of Another Tree', slug: 'subtree-of-another-tree', difficulty: 'Easy', topic: 'Trees', tags: ['Binary Tree', 'DFS', 'Hash Function', 'String Matching', 'Tree'] },
  { id: 235, title: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'Medium', topic: 'Trees', tags: ['BST', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 102, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'Medium', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'Tree'] },
  { id: 199, title: 'Binary Tree Right Side View', slug: 'binary-tree-right-side-view', difficulty: 'Medium', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 1448, title: 'Count Good Nodes in Binary Tree', slug: 'count-good-nodes-in-binary-tree', difficulty: 'Medium', topic: 'Trees', tags: ['Binary Tree', 'DFS', 'Tree'] },
  { id: 98, title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'Medium', topic: 'Trees', tags: ['BST', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 230, title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium', topic: 'Trees', tags: ['BST', 'Binary Tree', 'DFS', 'Tree'] },
  { id: 105, title: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', difficulty: 'Medium', topic: 'Trees', tags: ['Array', 'Binary Tree', 'Divide and Conquer', 'Hash Table', 'Tree'] },
  { id: 124, title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'Hard', topic: 'Trees', tags: ['Binary Tree', 'DFS', 'Dynamic Programming', 'Tree'] },
  { id: 297, title: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', difficulty: 'Hard', topic: 'Trees', tags: ['BFS', 'Binary Tree', 'DFS', 'Design', 'String', 'Tree'] },

  // Tries
  { id: 208, title: 'Implement Trie', slug: 'implement-trie-prefix-tree', difficulty: 'Medium', topic: 'Tries', tags: ['Design', 'Hash Table', 'String', 'Trie'] },
  { id: 211, title: 'Design Add and Search Words Data Structure', slug: 'design-add-and-search-words-data-structure', difficulty: 'Medium', topic: 'Tries', tags: ['Backtracking', 'Design', 'DFS', 'String', 'Trie'] },
  { id: 212, title: 'Word Search II', slug: 'word-search-ii', difficulty: 'Hard', topic: 'Tries', tags: ['Array', 'Backtracking', 'Matrix', 'Trie'] },

  // Heap / Priority Queue
  { id: 703, title: 'Kth Largest Element in a Stream', slug: 'kth-largest-element-in-a-stream', difficulty: 'Easy', topic: 'Heap', tags: ['Binary Search Tree', 'Data Stream', 'Design', 'Heap'] },
  { id: 1046, title: 'Last Stone Weight', slug: 'last-stone-weight', difficulty: 'Easy', topic: 'Heap', tags: ['Array', 'Greedy', 'Heap'] },
  { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin', difficulty: 'Medium', topic: 'Heap', tags: ['Array', 'Divide and Conquer', 'Geometry', 'Heap', 'Quickselect', 'Sorting'] },
  { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array', difficulty: 'Medium', topic: 'Heap', tags: ['Array', 'Divide and Conquer', 'Heap', 'Quickselect', 'Sorting'] },
  { id: 621, title: 'Task Scheduler', slug: 'task-scheduler', difficulty: 'Medium', topic: 'Heap', tags: ['Array', 'Greedy', 'Hash Table', 'Heap', 'Sorting'] },
  { id: 355, title: 'Design Twitter', slug: 'design-twitter', difficulty: 'Medium', topic: 'Heap', tags: ['Design', 'Hash Table', 'Heap', 'Linked List'] },
  { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', topic: 'Heap', tags: ['Data Stream', 'Design', 'Heap', 'Sorting', 'Two Pointers'] },

  // Backtracking
  { id: 78, title: 'Subsets', slug: 'subsets', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking', 'Bit Manipulation'] },
  { id: 39, title: 'Combination Sum', slug: 'combination-sum', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking'] },
  { id: 40, title: 'Combination Sum II', slug: 'combination-sum-ii', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking'] },
  { id: 46, title: 'Permutations', slug: 'permutations', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking'] },
  { id: 90, title: 'Subsets II', slug: 'subsets-ii', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking', 'Bit Manipulation'] },
  { id: 79, title: 'Word Search', slug: 'word-search', difficulty: 'Medium', topic: 'Backtracking', tags: ['Array', 'Backtracking', 'DFS', 'Matrix'] },
  { id: 131, title: 'Palindrome Partitioning', slug: 'palindrome-partitioning', difficulty: 'Medium', topic: 'Backtracking', tags: ['Backtracking', 'DP', 'String'] },
  { id: 17, title: 'Letter Combinations of a Phone Number', slug: 'letter-combinations-of-a-phone-number', difficulty: 'Medium', topic: 'Backtracking', tags: ['Backtracking', 'Hash Table', 'String'] },
  { id: 51, title: 'N-Queens', slug: 'n-queens', difficulty: 'Hard', topic: 'Backtracking', tags: ['Array', 'Backtracking'] },

  // Graphs
  { id: 200, title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'DFS', 'Matrix', 'Union Find'] },
  { id: 133, title: 'Clone Graph', slug: 'clone-graph', difficulty: 'Medium', topic: 'Graphs', tags: ['BFS', 'DFS', 'Graph', 'Hash Table'] },
  { id: 695, title: 'Max Area of Island', slug: 'max-area-of-island', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'DFS', 'Matrix', 'Union Find'] },
  { id: 417, title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'DFS', 'Matrix'] },
  { id: 130, title: 'Surrounded Regions', slug: 'surrounded-regions', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'DFS', 'Matrix', 'Union Find'] },
  { id: 994, title: 'Rotting Oranges', slug: 'rotting-oranges', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'Matrix'] },
  { id: 286, title: 'Walls and Gates', slug: 'walls-and-gates', difficulty: 'Medium', topic: 'Graphs', tags: ['Array', 'BFS', 'Matrix'] },
  { id: 207, title: 'Course Schedule', slug: 'course-schedule', difficulty: 'Medium', topic: 'Graphs', tags: ['BFS', 'DFS', 'Graph', 'Topological Sort'] },
  { id: 210, title: 'Course Schedule II', slug: 'course-schedule-ii', difficulty: 'Medium', topic: 'Graphs', tags: ['BFS', 'DFS', 'Graph', 'Topological Sort'] },
  { id: 684, title: 'Redundant Connection', slug: 'redundant-connection', difficulty: 'Medium', topic: 'Graphs', tags: ['DFS', 'Graph', 'Union Find'] },
  { id: 323, title: 'Number of Connected Components in an Undirected Graph', slug: 'number-of-connected-components-in-an-undirected-graph', difficulty: 'Medium', topic: 'Graphs', tags: ['DFS', 'Graph', 'Union Find'] },
  { id: 261, title: 'Graph Valid Tree', slug: 'graph-valid-tree', difficulty: 'Medium', topic: 'Graphs', tags: ['BFS', 'DFS', 'Graph', 'Union Find'] },
  { id: 127, title: 'Word Ladder', slug: 'word-ladder', difficulty: 'Hard', topic: 'Graphs', tags: ['BFS', 'Hash Table', 'String'] },

  // Advanced Graphs
  { id: 332, title: 'Reconstruct Itinerary', slug: 'reconstruct-itinerary', difficulty: 'Hard', topic: 'Advanced Graphs', tags: ['DFS', 'Eulerian Circuit', 'Graph'] },
  { id: 1584, title: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points', difficulty: 'Medium', topic: 'Advanced Graphs', tags: ['Array', 'Greedy', 'Minimum Spanning Tree', 'Union Find'] },
  { id: 743, title: 'Network Delay Time', slug: 'network-delay-time', difficulty: 'Medium', topic: 'Advanced Graphs', tags: ['BFS', 'DFS', 'Dijkstra', 'Graph', 'Heap'] },
  { id: 778, title: 'Swim in Rising Water', slug: 'swim-in-rising-water', difficulty: 'Hard', topic: 'Advanced Graphs', tags: ['Array', 'BFS', 'Binary Search', 'DFS', 'Heap', 'Matrix', 'Union Find'] },
  { id: 269, title: 'Alien Dictionary', slug: 'alien-dictionary', difficulty: 'Hard', topic: 'Advanced Graphs', tags: ['BFS', 'DFS', 'Graph', 'Topological Sort'] },
  { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops', difficulty: 'Medium', topic: 'Advanced Graphs', tags: ['BFS', 'Bellman-Ford', 'DP', 'DFS', 'Graph', 'Heap'] },

  // 1-D Dynamic Programming
  { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'Easy', topic: '1-D DP', tags: ['DP', 'Math', 'Memoization'] },
  { id: 746, title: 'Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', difficulty: 'Easy', topic: '1-D DP', tags: ['Array', 'DP'] },
  { id: 198, title: 'House Robber', slug: 'house-robber', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'DP'] },
  { id: 213, title: 'House Robber II', slug: 'house-robber-ii', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'DP'] },
  { id: 5, title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'Medium', topic: '1-D DP', tags: ['DP', 'String', 'Two Pointers'] },
  { id: 647, title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'Medium', topic: '1-D DP', tags: ['DP', 'String', 'Two Pointers'] },
  { id: 91, title: 'Decode Ways', slug: 'decode-ways', difficulty: 'Medium', topic: '1-D DP', tags: ['DP', 'String'] },
  { id: 322, title: 'Coin Change', slug: 'coin-change', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'BFS', 'DP'] },
  { id: 152, title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'DP'] },
  { id: 139, title: 'Word Break', slug: 'word-break', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'DP', 'Hash Table', 'Memoization', 'String', 'Trie'] },
  { id: 300, title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'Binary Search', 'DP'] },
  { id: 416, title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', difficulty: 'Medium', topic: '1-D DP', tags: ['Array', 'DP'] },

  // 2-D Dynamic Programming
  { id: 62, title: 'Unique Paths', slug: 'unique-paths', difficulty: 'Medium', topic: '2-D DP', tags: ['Combinatorics', 'DP', 'Math'] },
  { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence', difficulty: 'Medium', topic: '2-D DP', tags: ['DP', 'String'] },
  { id: 309, title: 'Best Time to Buy and Sell Stock with Cooldown', slug: 'best-time-to-buy-and-sell-stock-with-cooldown', difficulty: 'Medium', topic: '2-D DP', tags: ['Array', 'DP'] },
  { id: 518, title: 'Coin Change II', slug: 'coin-change-ii', difficulty: 'Medium', topic: '2-D DP', tags: ['Array', 'DP'] },
  { id: 494, title: 'Target Sum', slug: 'target-sum', difficulty: 'Medium', topic: '2-D DP', tags: ['Array', 'Backtracking', 'DP', 'DFS'] },
  { id: 97, title: 'Interleaving String', slug: 'interleaving-string', difficulty: 'Medium', topic: '2-D DP', tags: ['DP', 'Memoization', 'String'] },
  { id: 329, title: 'Longest Increasing Path in a Matrix', slug: 'longest-increasing-path-in-a-matrix', difficulty: 'Hard', topic: '2-D DP', tags: ['Array', 'DFS', 'DP', 'Graph', 'Memoization', 'Matrix', 'Topological Sort'] },
  { id: 115, title: 'Distinct Subsequences', slug: 'distinct-subsequences', difficulty: 'Hard', topic: '2-D DP', tags: ['DP', 'String'] },
  { id: 72, title: 'Edit Distance', slug: 'edit-distance', difficulty: 'Medium', topic: '2-D DP', tags: ['DP', 'String'] },
  { id: 312, title: 'Burst Balloons', slug: 'burst-balloons', difficulty: 'Hard', topic: '2-D DP', tags: ['Array', 'DP'] },
  { id: 10, title: 'Regular Expression Matching', slug: 'regular-expression-matching', difficulty: 'Hard', topic: '2-D DP', tags: ['DP', 'Recursion', 'String'] },

  // Greedy
  { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'Divide and Conquer', 'DP'] },
  { id: 55, title: 'Jump Game', slug: 'jump-game', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'DP', 'Greedy'] },
  { id: 45, title: 'Jump Game II', slug: 'jump-game-ii', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'DP', 'Greedy'] },
  { id: 134, title: 'Gas Station', slug: 'gas-station', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'Greedy'] },
  { id: 846, title: 'Hand of Straights', slug: 'hand-of-straights', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'Greedy', 'Hash Table', 'Sorting'] },
  { id: 1899, title: 'Merge Triplets to Form Target Triplet', slug: 'merge-triplets-to-form-target-triplet', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'Greedy'] },
  { id: 763, title: 'Partition Labels', slug: 'partition-labels', difficulty: 'Medium', topic: 'Greedy', tags: ['Array', 'Greedy', 'Hash Table', 'String', 'Two Pointers'] },
  { id: 678, title: 'Valid Parenthesis String', slug: 'valid-parenthesis-string', difficulty: 'Medium', topic: 'Greedy', tags: ['DP', 'Greedy', 'Stack', 'String'] },

  // Intervals
  { id: 57, title: 'Insert Interval', slug: 'insert-interval', difficulty: 'Medium', topic: 'Intervals', tags: ['Array'] },
  { id: 56, title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', topic: 'Intervals', tags: ['Array', 'Sorting'] },
  { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'Medium', topic: 'Intervals', tags: ['Array', 'DP', 'Greedy', 'Sorting'] },
  { id: 252, title: 'Meeting Rooms', slug: 'meeting-rooms', difficulty: 'Easy', topic: 'Intervals', tags: ['Array', 'Sorting'] },
  { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'Medium', topic: 'Intervals', tags: ['Array', 'Greedy', 'Heap', 'Prefix Sum', 'Sorting', 'Two Pointers'] },
  { id: 1851, title: 'Minimum Interval to Include Each Query', slug: 'minimum-interval-to-include-each-query', difficulty: 'Hard', topic: 'Intervals', tags: ['Array', 'Binary Search', 'Heap', 'Sorting'] },

  // Math & Geometry
  { id: 48, title: 'Rotate Image', slug: 'rotate-image', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Array', 'Math', 'Matrix'] },
  { id: 54, title: 'Spiral Matrix', slug: 'spiral-matrix', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Array', 'Matrix', 'Simulation'] },
  { id: 73, title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Array', 'Hash Table', 'Matrix'] },
  { id: 202, title: 'Happy Number', slug: 'happy-number', difficulty: 'Easy', topic: 'Math & Geometry', tags: ['Hash Table', 'Math', 'Two Pointers'] },
  { id: 66, title: 'Plus One', slug: 'plus-one', difficulty: 'Easy', topic: 'Math & Geometry', tags: ['Array', 'Math'] },
  { id: 50, title: 'Pow(x, n)', slug: 'powx-n', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Math', 'Recursion'] },
  { id: 43, title: 'Multiply Strings', slug: 'multiply-strings', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Math', 'Simulation', 'String'] },
  { id: 2013, title: 'Detect Squares', slug: 'detect-squares', difficulty: 'Medium', topic: 'Math & Geometry', tags: ['Array', 'Counting', 'Design', 'Geometry', 'Hash Table'] },

  // Bit Manipulation
  { id: 136, title: 'Single Number', slug: 'single-number', difficulty: 'Easy', topic: 'Bit Manipulation', tags: ['Array', 'Bit Manipulation'] },
  { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits', difficulty: 'Easy', topic: 'Bit Manipulation', tags: ['Bit Manipulation', 'Divide and Conquer'] },
  { id: 338, title: 'Counting Bits', slug: 'counting-bits', difficulty: 'Easy', topic: 'Bit Manipulation', tags: ['Bit Manipulation', 'DP'] },
  { id: 190, title: 'Reverse Bits', slug: 'reverse-bits', difficulty: 'Easy', topic: 'Bit Manipulation', tags: ['Bit Manipulation', 'Divide and Conquer'] },
  { id: 268, title: 'Missing Number', slug: 'missing-number', difficulty: 'Easy', topic: 'Bit Manipulation', tags: ['Array', 'Bit Manipulation', 'Hash Table', 'Math', 'Sorting'] },
  { id: 371, title: 'Sum of Two Integers', slug: 'sum-of-two-integers', difficulty: 'Medium', topic: 'Bit Manipulation', tags: ['Bit Manipulation', 'Math'] },
  { id: 7, title: 'Reverse Integer', slug: 'reverse-integer', difficulty: 'Medium', topic: 'Bit Manipulation', tags: ['Math'] },

  // Sorting
  { id: 912, title: 'Sort an Array', slug: 'sort-an-array', difficulty: 'Medium', topic: 'Sorting', tags: ['Array', 'Divide and Conquer', 'Heap', 'Merge Sort', 'Sorting'] },
  { id: 75, title: 'Sort Colors', slug: 'sort-colors', difficulty: 'Medium', topic: 'Sorting', tags: ['Array', 'Sorting', 'Two Pointers'] },
  { id: 148, title: 'Sort List', slug: 'sort-list', difficulty: 'Medium', topic: 'Sorting', tags: ['Divide and Conquer', 'Linked List', 'Merge Sort', 'Sorting', 'Two Pointers'] },
  { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self', difficulty: 'Hard', topic: 'Sorting', tags: ['Array', 'Binary Indexed Tree', 'Binary Search', 'Divide and Conquer', 'Merge Sort', 'Segment Tree', 'Sorting'] },
]

export const TOPICS = [...new Set(problems.map((p) => p.topic))]
