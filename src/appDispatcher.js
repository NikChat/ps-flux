import { Dispatcher } from "flux";
const dispatcher = new Dispatcher();
export default dispatcher;   // one dispatcher per app, that the rest of the app can use
                            // will hold a list of calbacks, and all our app's actions will be dispached via this dispatcher
                            // Stores will register with this dispatcher to be informed when actions occur