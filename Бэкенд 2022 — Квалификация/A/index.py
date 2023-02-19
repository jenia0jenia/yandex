import time

def main():
    def disable(center, j, m):
        center["disabled"].add(j)
        center["val"] = (
            m - len(center["disabled"])) * center["reset"]

    def reset(center, m):
        center["disabled"].clear()
        center["reset"] += 1
        center["val"] = m * center["reset"]

    n, m, q = map(int, input().split(' '))
    centers = dict()
    result = list()
    valList = {
        0: set(range(1, n + 1))
    }
    curMin = False
    curMax = False

    for _ in range(q):
        event = input().split(' ')
        name = event[0]

        if name == "GETMAX":
            if not curMax:
                maxVal = -1
                for value in valList:
                    if (maxVal < 0 or value > maxVal) and len(valList[value]):
                        maxVal = value

                curMax = min(valList[maxVal])
            
            result.append(str(curMax))
        elif name == "GETMIN":
            if not curMin:
                minVal = -1

                for value in valList:
                    if (minVal < 0 or value < minVal) and len(valList[value]):
                        minVal = value

                curMin = min(valList[minVal])

            result.append(str(curMin))
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
            elif name == "RESET":
                reset(centers[i], m)

            curMin = False
            curMax = False

            valList.setdefault(centers[i]["val"], set())
            valList[centers[i]["val"]].add(i)

    print("\n".join(result))



if __name__ == '__main__':
    start_time = time.time()
    main()
    print("--- %s seconds ---" % (time.time() - start_time))

