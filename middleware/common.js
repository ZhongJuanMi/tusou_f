export default function({ route, store, req, res, redirect, $axios }) {
  if (process.server) {
    // 判断是否手机端
    if (
      /Android|webOS|iPhone|iPod|BlackBerry/i.test(req.headers['user-agent'])
    ) {
      return redirect('http://47.106.200.223:8080')
    }
  }
}
