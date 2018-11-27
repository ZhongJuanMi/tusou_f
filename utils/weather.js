// 天气图片
const weatherpics = {}
for (let i = 0; i < 100; i < 38 ? i++ : (i += 61)) {
  weatherpics[i] = require(`~/assets/images/weather/${i}.png`)
}
export default weatherpics
