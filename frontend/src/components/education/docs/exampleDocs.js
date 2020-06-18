import React from "react"
import {header, bodyContent} from "./fileFormatter"

const example =
<p>
{header("Example", "+2")}

{header("What's it for?")}

{bodyContent(``)}

{header("How does it work?")}

<p align="center">
  <img src="https://github.com/lenghuang/MLforAll/blob/master/frontend/src/pictures/headshots/max.jpg?raw=true" alt=""/>
</p>

{bodyContent(`
![Me](https://github.com/lenghuang/MLforAll/blob/master/frontend/src/pictures/headshots/max.jpg?raw=true)
`)}

{header("Why does it work?")}

{bodyContent(``)}
</p>



export default example;