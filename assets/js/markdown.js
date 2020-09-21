// markdown 导出页面作为iframe加载，调整iframe的大小
function frameLoad() {
  let elements = document.getElementsByClassName("content_frame");

  for (let i = 0; i < elements.length; i++) {
    let frame = elements.item(i);
    frame.height = frame.contentWindow.document.body.scrollHeight;
  }
}
