find the longestsubstring of an array
To find the longest substring of an array, you can use a sliding window approach. Here's a sample implementation in C#:```csharp
using System;       
using System.Collections.Generic;
using System.Linq;

public class LongestSubstringFinder
{
    public static string FindLongestSubstring(string input)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        int start = 0, maxLength = 0;
        Dictionary<char, int> charIndexMap = new Dictionary<char, int>();

        for (int end = 0; end < input.Length; end++)
        {
            char currentChar = input[end];

            if (charIndexMap.ContainsKey(currentChar) && charIndexMap[currentChar] >= start)
            {
                start = charIndexMap[currentChar] + 1;
            }

            charIndexMap[currentChar] = end;

            if (end - start + 1 > maxLength)
            {
                maxLength = end - start + 1;
            }
        }

        return input.Substring(start, maxLength);
    }

    public static void Main(string[] args)
    {
        string input = "abcabcbb";
        string longestSubstring = FindLongestSubstring(input);
        Console.WriteLine($"The longest substring without repeating characters is: {longestSubstring}");
    }
}