window.__CLASSES__.home =  class home {
            constructor({container = ''} = {container: ''}) {
                this.container = container
                //this.id = makeid();
                //this.mid = makeid(); 
            }

            get render() {
                let that = this;

                that.container.innerHTML += `<div class="test">
                                                                <h1>Test Component</h1>
                                                                <button class="btn btn-primary">Click Me</button>
                                                                <p><a href="/about">Go to About</a></p>
                                                                <p><a href="/forms">Go to Forms</a></p>
                                                            </div>`;
            }
}