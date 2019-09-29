class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error('Config is missing');
        }
        
        this.state = config.initial;
        this.states = config.states;
        this.history = [this.state];
        this.currentPosition = 0;
    }

    setState(state) {
         this.state = state;
         this.currentPosition++;
         this.history[this.currentPosition] = state;
         
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states[state]) {
            throw new Error('State was not found');
        }

        this.setState(state);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const state = this.states[this.state].transitions[event]
        if (!state) {
            throw new Error('Trigger was not found');
        }

        this.setState(state);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.history[0];
        this.history = [this.state];
        this.currentPosition = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];

        for (let state in this.states) {
            if (!event) {
                states.push(state);
            } else {
                let transitions = this.states[state].transitions;

                for (let evt in transitions) {
                    if (evt === event) {
                        states.push(state);
                    }
                }
            }
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        this.currentPosition--;

        if (this.currentPosition < 0) {
            this.currentPosition++;
            return false;
        }

        this.state = this.history[this.currentPosition];

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.currentPosition++;

        if (this.currentPosition >= this.history.length) {
            this.currentPosition--;
            return false;
        }

        this.state = this.history[this.currentPosition];


        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.history[0]
        this.history = [this.state];
        this.currentPosition = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
