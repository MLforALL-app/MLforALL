import React from "react";
import { header, bodyContent } from "./fileFormatter";

const additionalResources = (
    <div>
        {header("Additional Resources", "+2")}

        {bodyContent(`
For additional learning resources, check out
- [The Elements of Statistical Learning](https://web.stanford.edu/~hastie/ElemStatLearn/)
- [Stanford CS229: Machine Learning](http://cs229.stanford.edu/)
- [scikit-learn Documentation](https://scikit-learn.org/stable/index.html)
- [Python Like You Mean It](https://www.pythonlikeyoumeanit.com/index.html)
`)}
    </div>
);

export default additionalResources;
