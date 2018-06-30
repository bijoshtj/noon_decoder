
var finalDecode = function (str) {
  let res = "";
  let idx = 0;
  let push = false;
  let tmp_arr = [];

  //console.log('inp', str);
  while (idx < str.length) {
    //console.log('while', idx);
    let curr = parseInt(str[idx], 10) || str[idx];

    if (push || curr > 0) {
      push = true;
    }

    if (curr === ')') {
      push = false;
    }

    if (push) {
      tmp_arr.push(curr);
    } else if (curr !== ')') {
      res+=curr;
    }

    if (curr === ')') {
      //console.log('found close', tmp_arr);
      let curr = tmp_arr.pop();
      let tmp_str = "";
      do {
        tmp_str+= curr;
        curr = tmp_arr.pop();
      } while(curr != '(')

      //console.log('str is', tmp_str);
      tmp_str = tmp_str.split("").reverse().join("");
      tmp_str = finalDecode(tmp_str);
      let multiplier = tmp_arr.pop();
      let multi_str = ""

      //console.log('multiplier', multiplier);

      while (multiplier > 0) {
        multi_str+=tmp_str;
        --multiplier;
      }

      if (tmp_arr.length > 0) {
        for (let i = 0; i < multi_str.length; i++) {
          tmp_arr.push(multi_str[i]);
        }
        push = true;
      } else {
        res+= multi_str;
      }
    }

    idx++;
  }

  return res;
}
console.log("Decoded output is: ", finalDecode(process.argv[2]));
