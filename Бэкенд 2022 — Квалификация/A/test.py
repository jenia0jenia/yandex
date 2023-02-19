def log(i, center):
    return f"id = {i} desabled = {'-'.join(center['disabled'])} reset {center['reset']} val {center['val']}\n"


def main():
    def disable(center, j, m):
        center["disabled"].add(j)
        center["val"] = (
            m - len(center["disabled"])) * center["reset"]

    def reset(center, m):
        center["disabled"].clear()
        center["reset"] += 1
        center["val"] = m * center["reset"]

    def slow(centers):
        maxi = 1
        maxVal = 0
        for i in centers:
            if centers[i]["val"] > maxVal:
                maxVal = centers[i]["val"]
                maxi = i
            elif centers[i]["val"] == maxVal and i < maxi:
                maxVal = centers[i]["val"]
                maxi = i
        return maxi

    def fast(valList):
        maxVal = -1
        for value in valList:
            if (maxVal < 0 or value > maxVal) and len(valList[value]):
                maxVal = value

        curMax = min(valList[maxVal])
        return curMax

    def slowMin(centers):
        mini = 1
        minVal = -1
        for i in range(1, n + 1):
            centers.setdefault(i, {
                "disabled": set(),
                "reset": 0,
                "val": 0
            })

            if centers[i]["val"] == 0:
                mini = i
                break

            if minVal == -1:
                minVal = centers[i]["val"]
                mini = i

            if centers[i]["val"] < minVal:
                minVal = centers[i]["val"]
                mini = i

        return mini

    def fastMin(valList):
        return min(valList)
    
    n, m, q = map(int, input().split(' '))
    centers = dict()
    result = list()
    output = "output.txt"
    valList = {
        0: set(range(1, m + 1))
    }

    try:
        with open(output, 'w') as f:
            for _ in range(q):
                line = input()
                event = line.split(' ')
                name = event[0]

                if name == "GETMAX":
                    # slowRes = slow(centers)
                    fastRes = fast(valList)
                    # if (slowRes != fastRes):
                    #     f.write("-------------------------\n")
                    #     f.write(line + "\n")
                    #     f.write(str(slowRes) + " " + str(fastRes) + "\n")
                    #     f.write(log(slowRes, centers[slowRes]))
                    #     f.write(log(fastRes, centers[fastRes]))
                    #     raise Exception(event)
                    f.write(str(fastRes) + "\n")
                elif name == "GETMIN":
                    # slowRes = slowMin(centers)
                    fastRes = fastMin(valList)
                    # if (slowRes != fastRes):
                    #     # print(valList.keys())
                    #     f.write("-------------------------\n")
                    #     f.write(line + "\n")
                    #     f.write(str(slowRes) + " " + str(fastRes) + "\n")
                    #     f.write(log(slowRes, centers[slowRes]))
                    #     # f.write(log(fastRes, centers[fastRes]))
                    #     raise Exception(event)
                    result.append(str(fastRes))
                else:
                    i = int(event[1])
                    centers.setdefault(i, {
                        "disabled": set(),
                        "reset": 0,
                        "val": 0
                    })
                    valList.setdefault(centers[i]["val"], set())

                    if i in valList[centers[i]["val"]]:
                        valList[centers[i]["val"]].remove(i)

                    if name == "DISABLE":
                        disable(centers[i], event[2], m)
                        curMin = False
                    elif name == "RESET":
                        reset(centers[i], m)
                        curMax = False

                    valList.setdefault(centers[i]["val"], set())
                    valList[centers[i]["val"]].add(i)

            # f.write("\n".join(result))
            f.write(','.join(map(str, valList)))
        
    except FileNotFoundError:
        return 'FileNotFoundError'


if __name__ == '__main__':
    main()
