def main():
    input = "input.txt"
    output = "output.txt"
    rockets = {}
    result = ''
    try:
        with open(input, 'r') as f:
            records = [line.rstrip() for line in f]
            N = int(records[0])

            for i in range(1, N + 1):
                record = records[i].split(' ')
                status = record.pop()

                if (status == 'B'):
                    continue

                id = int(record[3])

                if id not in rockets:
                    rockets[id] = {
                        "starts": [],
                        "ends": []
                    }

                if (status == 'A'):
                    status = 'starts'
                else:
                    status = 'ends'

                rockets[id][status].append(
                    int(record[0]) * 24 * 60 + int(record[1]) * 60 + int(record[2]))

    except FileNotFoundError:
        return 'FileNotFoundError'

    try:
        with open(output, 'w') as f:
            for id in sorted(rockets):
                result += str(sum(rockets[id]["ends"]) -
                              sum(rockets[id]["starts"])) + ' '
                
                if len(result) > 100:
                    f.write(result)
                    result = ''

            f.write(result)
    except FileNotFoundError:
        return 'FileNotFoundError'


if __name__ == '__main__':
    main()
