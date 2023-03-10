express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist/index.html"));
app.listen(PORT, () => { console.log(`Server has been started on port ${PORT}`); });
