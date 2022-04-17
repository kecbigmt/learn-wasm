(module
  (import "env" "log" (func $log (param i32 i32)))

  (func $loop_test (export "loop_test")
    (param $n i32)
    (result i32)

    (local $i i32)
    (local $factorial i32)

    (local.set $factorial (i32.const 1))

    (loop $continue (block $break  ;; $continueループと$breakブロック
      (local.set $i (i32.add (local.get $i) (i32.const 1)))

      ;; $iの階乗の値
      ;; $factorial = $factorial * $i
      (local.set $factorial (i32.mul (local.get $factorial) (local.get $i)))
      
      ;; $logを呼び出し、パラメータ$iと$factorialを渡す
      (call $log (local.get $i) (local.get $factorial))

      ;; $i == $n の場合はループを抜ける
      (br_if $break (i32.eq (local.get $i) (local.get $n)))

      ;; ループの先頭に分岐
      br $continue
    ))

    ;; $factorialを呼び出し元のJavaScriptに返す
    local.get $factorial
  )
)