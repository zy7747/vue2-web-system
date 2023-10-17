import lodash from "lodash";

export default {
  bind(el, binding) {
    const debounceTime = parseInt(binding.arg) || 1000; // 获取指令参数，设置默认的防抖延迟时间
    const event = binding.modifiers.event || "click"; // 获取指令修饰符，设置默认的事件类型为 click
    const callback = binding.value; // 获取指令绑定的处理函数

    //使用 lodash 的防抖函数进行处理
    const debouncedFn = lodash.debounce(callback, debounceTime);

    // 绑定事件监听器
    el.addEventListener(event, debouncedFn);
  },

  unbind: function (el, binding) {
    const event = binding.modifiers.event || "click"; // 获取指令修饰符

    // 移除事件监听器
    el.removeEventListener(event, debouncedFn);
  },
};
