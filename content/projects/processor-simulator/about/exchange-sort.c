#include <malloc.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void randomize();
void print_data();

typedef uint32_t UWord;
typedef int32_t Word;

const UWord MIN = 0;
const UWord MAX = 65535;

UWord *DATA;
const size_t LEN = 100;

Word compare(UWord[], UWord, UWord);
void swap(UWord[], UWord, UWord);

int main() {
    randomize();
    print_data();

    UWord x = 0;
    UWord y;
    UWord min;

x_loop:
    while (x < LEN) { // goto end (if x >= LEN)
        min = x;
        y = x + 1;
    y_loop:
        while (y < LEN) { // goto do_swap (if y >= LEN)
            Word comp = compare(DATA, y, min);

            if (comp < 0)
                min = y;
            y = y + 1;
        } // goto y_loop
    do_swap:
        swap(DATA, x, min);
        x = x + 1;
    } // goto x_loop

end:
    print_data();
    free(DATA);
}

Word compare(UWord array[], UWord idx1, UWord idx2) {
    UWord left = array[idx1];
    UWord right = array[idx2];

    return left - right;
}

void swap(UWord array[], UWord idx1, UWord idx2) {
    UWord temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}

#pragma region diagnostic

void print_data() {
    for (size_t i = 0; i < LEN; ++i) {
        printf("%05u ", DATA[i]);
        if (i % 16 == 15)
            printf("\n");
    }
    printf("\n\n");
}

UWord X = 0;
UWord Y = 0;
UWord bitsnacker_random() {
    // bitkeeper
    UWord ob, eb;
    // bitcounter
    UWord u = 0, o = 0, e = 0, a = 0;
    for (size_t i = 0; i < 16; ++i) {
        UWord be = (X & (i * 2)) != 0;
        UWord bo = (Y & (i * 2 + 1)) != 0;

        e += be;
        o += bo;
        ob = bo << i;
        eb = be << i;
        a += ((X ^ Y) & (((o + e) * i) % 32)) != 0;
        u = bo == be;
    }

    // diffbits
    UWord xr = (ob ^ eb) | ((ob & eb) << 16);

    X = (Y << e * u | (((a + e) & o) != u)) + (X >> o);
    Y = (X * Y * xr) + o * Y + e * X;

    char *_x = (char *)&X;
    char *_y = (char *)&Y;
    char tmp = 0;

    // swap outer bytes between X and Y
    tmp = _x[0];
    _x[0] = _y[3];
    _y[3] = tmp;
    tmp = _x[3];
    _x[3] = _y[0];
    _y[0] = tmp;

    // swap inner bytes
    tmp = _y[1];
    _y[1] = _y[2];
    _y[2] = tmp;
    tmp = _x[1];
    _x[1] = _x[2];
    _x[2] = tmp;

    // sum and clamp
    return ((X + Y) % (MAX - MIN)) + MIN;
}

void randomize() {
    srand(time(0));
    X = rand();
    Y = rand();

    DATA = calloc(LEN, sizeof(UWord));

    for (size_t i = 0; i < LEN; ++i)
        DATA[i] = bitsnacker_random();
}

#pragma endregion
