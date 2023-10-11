<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const node = [];

    if (icon) {
      if (icon.includes("el-icon")) {
        node.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        node.push(<svg-icon icon-class={icon} class="menu-icon" />);
      }
    } else {
      node.push(<svg-icon icon-class="页签" class="menu-icon" />);
    }

    if (title) {
      node.push(
        <span class="title" slot="title">
          {title}
        </span>
      );
    }
    return node;
  },
};
</script>

<style scoped>
.sub-el-icon {
  width: 2em;
  height: 2em;
}

.menu-icon {
  font-size: 19px;
}

.title {
  margin-left: 25px;
}
</style>
