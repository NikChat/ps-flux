import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = []; // Private Storage

class CourseStore extends EventEmitter { // Our Store needs to emit an event each time a change occurs.
  
  addChangeListener(callback) { // This function will allow React components to subscribe to our store to be noticed when changes occur
    this.on(CHANGE_EVENT, callback);  // on: Adds a listener-callback function to the array of listeners for that event
  }                                  // When a change occurs in our store, we will call the callback passed in by the component

  removeChangeListener(callback) { // This function will allow React components to unsubscribe from the store
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT); // Calls each of the listeners registered for this event, in the order they were registered
  }

  getCourses() { // Expose the store's data -> Handy functions that return data from the Store
    return _courses;
  }

  getCourseBySlug(slug) { // Expose the store's data
    return _courses.find(course => course.slug === slug);
  }
}

const store = new CourseStore();

/* We Register the store with the dispatcher so that the store will be notified when actions occur: */
Dispatcher.register(action => {  // This will be called anytime an action is Dispatched (every store is notified of every action)
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();  // we call it anytime the store changes -> this notifies any React components registered with the store
      break;              // = any components that ever called addChangeListener, will be notified anytime I call emitChange
    default:
    // nothing to do here -> some action just occured that another store cares about
  }
});

export default store;
