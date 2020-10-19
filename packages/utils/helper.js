/* eslint-disable no-empty */
function wrapWithArray(obj) {
  if (obj !== undefined) return Array.isArray(obj) ? obj : [obj];
  else return [];
}

function multiply(n1, n2) {
  let m = 0;
  n1 = n1.toString();
  n2 = n2.toString();
  try {
    m += n1.split(".")[1].length;
  } catch (e) {}
  try {
    m += n2.split(".")[1].length;
  } catch (e) {}
  return (Number(n1.replace(".", "")) * Number(n2.replace(".", ""))) / 10 ** m;
}

export { wrapWithArray, multiply };
