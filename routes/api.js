const express = require('express');
const router = express.Router();

router.get('/:date?', (req, res) => {
  let dateParam = req.params.date;
  
  // 处理空日期参数（要求7-8）
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // 处理数字型时间戳（要求4）
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);
  
  // 无效日期处理（要求6）
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // 有效日期响应（要求2-3）
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

module.exports = router;
