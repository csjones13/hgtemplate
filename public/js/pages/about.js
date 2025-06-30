window.__CLASSES__.about =  class about {
            constructor({container = ''} = {container: ''}) {
                this.container = container
                //this.id = makeid();
                //this.mid = makeid(); 
            }

            get render() {
                let that = this;

                that.container.innerHTML += `<div class="test">
                                                                <h1>Test Component</h1>
                                                                <button id="testButton">Click Me</button>
                                                                <p><a href="/">Go to Home</a></p>
                                                                <p><a href="/forms">Go to Forms</a></p>
                                                            </div>`;
            }
}