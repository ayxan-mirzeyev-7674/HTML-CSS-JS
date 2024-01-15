from random import choice
import string

text = "https://youtube.com/watch?v=sfbjkfbdshjbsjdhbfbhjasdhjbsadjbhjashdbasbhdjbsadhjasdbjhsahdshbdsdf"

print(''.join(choice(string.ascii_letters+string.digits) for _ in range(len(text)//4))) 