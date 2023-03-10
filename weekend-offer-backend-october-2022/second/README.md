# Лента фотографий
------------------

Для разработки модуля отображения фотографий в виде вертикальной ленты решено использовать следующий алгоритм:

-   выбрать `k` фотографий из имеющейся коллекции;
-   отмасштабировать все фотографии до ширины `w`;
-   отображать полученные фотографии в вертикальном формате одна над одной без отступов.

Определите, какую наибольшую и наименьшую высоту может иметь полученная лента из `k` фотографий.

Будем считать, что при масштабировании фотографии размера `w'×h'` до ширины `w`, новая высота вычисляется по следующей формуле: `h=⌈h′⋅w​ / w′⌉`.

## Формат ввода
------------

В первой строке записано одно целое число `w (640≤w≤4096)`.

Во второй строке записаны два числа `n` и `k` `(1≤k≤n≤10^5)`.

В каждой из следующих `n` строк записана строка `w​×h​ (640≤w​,h​≤4096)`. Размеры фотографий записаны без пробелов.

## Формат вывода
-------------

Выведите в первой строке минимальную высоту ленты из `k` фотографий.

Во второй строке выведите максимальную высоту ленты из `k` фотографий.

### Пример 1

> Ввод

---

>2000
5 3
1000x1000
1000x1500
640x930
640x1500
3000x1000

> Вывод

---

>5574
10595

### Пример 2

> Ввод

---

> 1000
5 5
1404x1386
1132x1110
1061x1801
1022x1519
1529x1003

> Вывод

---

> 5810
5810

### Пример 3

> Ввод

---

> 4096
2 1
640x4096
4096x640

> Вывод

---

>640
26215

### Примечание
----------

Функция ''потолок'' ⌈x⌉ --- это наименьшее целое, большее или равное ⌈x⌉=min{n∈Z∣n⩾x.

| Ограничение памяти | Ограничение времени |
| --- | --- |
| 256.0 Мб | 1 с |

| Ввод | Вывод |
| --- | --- |
| стандартный ввод или input.txt | стандартный вывод или output.txt |