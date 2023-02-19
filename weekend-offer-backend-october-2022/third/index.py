import time
import sys


def main():
    n, m, k = map(int, input().split())
    tasks = []

    for _ in range(n):
        tasks.append(list(map(int, input().split(" "))))

    print(tasks)

    # while 0:
    #     pass


if __name__ == '__main__':
    main()
