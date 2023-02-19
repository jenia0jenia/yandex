def main():
    output = "input_2.txt"

    try:
        with open(output, 'w') as f:
            result = ''
            N = 200000
            f.write(str(N) + "\n")
            for i in range(N, 0, -1):
                result += f"1 1 {i} 1 A\n1 1 {i + 1} 1 S\n"

                if (len(result) > 100):
                    f.write(result)
                    result = ''

            f.write(result)

    except FileNotFoundError:
        return 'FileNotFoundError'


if __name__ == '__main__':
    main()
