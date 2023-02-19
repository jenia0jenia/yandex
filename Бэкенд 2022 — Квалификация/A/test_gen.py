from random import randint
q = 100000
n = 500
m = 500
input = "input.txt"


def getRandomLine():
    rand = randint(1, 4)

    if rand == 1:
        return f"DISABLE {randint(1, n)} {randint(1, m)}\n"

    if rand == 2:
        return f"RESET {randint(1, n)}\n"

    if rand == 3:
        return "GETMIN\n"

    return "GETMAX\n"


try:
    with open(input, 'w') as f:
        f.write(f"{n} {m} {q}\n")
        for i in range(1, q + 1):
            line = getRandomLine()
            f.write(line)

except FileNotFoundError:
    print('FileNotFoundError')
