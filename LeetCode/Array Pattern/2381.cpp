// You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.

// Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

// Return the final string after all such shifts to s are applied.

class Solution
{
public:
    string shiftingLetters(string s, vector<vector<int>> &shifts)
    {
        int n = s.size();
        vector<int> diff(n + 1, 0);

        for (auto shift : shifts)
        {
            if (shift[2] == 1)
            {
                diff[shift[0]]++;
                diff[shift[1] + 1]--;
            }
            else
            {
                diff[shift[0]]--;
                diff[shift[1] + 1]++;
            }
        }

        for (int i = 1; i <= n; ++i)
            diff[i] += diff[i - 1];

        string res;
        for (int i = 0; i < n; ++i)
        {
            int count = diff[i] % 26;
            if (count < 0)
                count = 26 + count;

            char curr = char((s[i] - 'a' + count) % 26 + 97);
            res.push_back(curr);
        }
        return res;
    }
};