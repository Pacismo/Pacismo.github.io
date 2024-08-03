.LEN = 100

#[location = 0x00000000]
main:
    load 0, v0    ; x
    load 0, v1    ; y
    load 0, v2    ; min
    load data, v3 ; DATA

x_loop:
    cmp v0, .LEN
    jge end

    tfr v0, v2
    tfr v0, v1

y_loop:
    add v1, 1, v1
    cmp v1, .LEN
    jge do_swap

    jsr compare

    cmp s v4, 0
    jge y_loop

    tfr v1, v2
    jmp y_loop

do_swap:
    jsr swap
    add v0, 1, v0
    jmp x_loop

end:
    halt

compare:
    push { v1, v2 }

    mul v1, 4, v1
    mul v2, 4, v2

    llr v3[v1] => v1
    llr v3[v2] => v2

    sub v1, v2, v4

    pop { v1, v2 }
    ret

swap:
    push { v0, v2, v4, v5 }

    mul v0, 4, v0
    mul v2, 4, v2

    llr v3[v0] => v4
    llr v3[v2] => v5
    slr v5 => v3[v0]
    slr v4 => v3[v2]

    pop { v0, v2, v4, v5 }
    ret

#[location = 0x00030000]
data:                    ; Make sure that the length is consistent with .LEN!
#word?[0, 8192; 100 %10] ; Randomized dataset of 100 elements in [0, 8192) with a seed of 10.
