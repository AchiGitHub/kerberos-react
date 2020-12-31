/* INDEX FILE
It exports as default the reducer function of the duck.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other ducks.
*/

import reducers from "./reducers";

import loginSelectors from "./selectors";
import loginService from "./service";
import loginTypes from "./types";
import loginActions from "./actions";

export {
    loginSelectors,
    loginService,
    loginActions,
    loginTypes
};

export default reducers;