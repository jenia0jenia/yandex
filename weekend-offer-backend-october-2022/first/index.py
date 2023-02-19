def main():
    n = int(input())
    size = n * 2 + 1
    positive = 1
    negative = -1
    matrix = [[0 for col in range(size)] for row in range(size)]

    for i in range(size):
        for j in range(size):
            if (i == j):
                continue

            if ((i + j) % 2 != 0):
                matrix[i][j] = positive
                positive = positive + 1
            else:
                matrix[j][i] = negative
                negative = negative - 1

    for row in matrix:
        for val in row:
            print(val, end=" ")
        print()


if __name__ == '__main__':
    main()
