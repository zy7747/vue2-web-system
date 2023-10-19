// 数字校验
export const NumValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg = /^\d+(?=\.{0,1}\d+$|$)/;
  let message = "";
  if (!reg.test(value)) {
    message = "请输入数字";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 手机号校验
export const phoneNumValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
  let message = "";
  if (!reg.test(value)) {
    message = "请输入正确的手机号";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 邮箱校验
export const EmailValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  let message = "";
  if (!reg.test(value)) {
    message = "请输入正确的邮箱";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 密码校验
export const PasswordValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg1 = /^.{6,18}$/;

  let reg2 = /^(?=.*[a-z]).{6,18}$/;

  let reg3 =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

  let message = "";
  if (!reg1.test(value)) {
    message = "请输入6-18位的密码";
    callback(new Error(message));
  } else if (!reg2.test(value)) {
    message = "密码必须包括一个小写字符";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 密码校验
export const UserNameValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg = /^[\w\u4e00-\u9fa5]{2,16}$/;

  let message = "";
  if (!reg.test(value)) {
    message = "请输入正确的用户名";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 身份证校验
export const IdCardValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

  let message = "";
  if (!reg.test(value)) {
    message = "请输入正确的身份证号码";
    callback(new Error(message));
  } else {
    callback();
  }
};

// 年龄校验
export const AgeValidate = (rule, value, callback) => {
  if (!value) return callback();
  let reg = /^(0|[1-9]\d?|1\d\d|200)$/;
  let message = "";
  if (!reg.test(value)) {
    message = "输入年龄必须在0-200之间";
    callback(new Error(message));
  } else {
    callback();
  }
};
