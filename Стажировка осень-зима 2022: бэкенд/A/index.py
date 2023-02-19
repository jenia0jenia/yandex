def main():
    N = int(input())
    candidates = ''
    for _ in range(N):
        candidate = input().split(',')
        letters = len(set(candidate[0] + candidate[1] + candidate[2]))
        birthDay = digitSum(candidate[3] + candidate[4])
        firstLetter = ord(candidate[0][0].lower()) - 96
        res = letters + birthDay * 64 + firstLetter * 256
        candidates += f"{res:0{3}x}".upper()[-3:] + ' '

    print(candidates)


def digitSum(str):
    res = 0
    for i in range(len(str)):
        res += int(str[i])
    return res

if __name__ == '__main__':
    main()
