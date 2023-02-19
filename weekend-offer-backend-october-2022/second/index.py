import math

def main():
    width = int(input())
    n, k = map(int, input().split())
    photos = []

    for _ in range(n):
        photo = list(map(int, input().split("x")))
        tmpW = photo[0]
        photo[0] = width
        photo[1] = math.ceil(photo[1] * width / tmpW)
        photos.append(photo)

    photos = sorted(photos, key=lambda x: x[1])
    minRes = sum(photo[1] for photo in photos[:k])
    maxRes = sum(photo[1] for photo in photos[n - k:])

    print(minRes)
    print(maxRes)

if __name__ == '__main__':
    main()
