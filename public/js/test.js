window.__CLASSES__.test =  class test {
            constructor({p = ''} = {p: ''}) {
                this.p = p
                //this.id = makeid();
                //this.mid = makeid(); 
            }

            get html() {
                let that = this;

                document.getElementById('root').innerHTML = `<div class="test">
                                                                <h1>Test Component</h1>
                                                                <p>Parameter: ${that.p}</p>
                                                                <button id="testButton">Click Me</button>
                                                            </div>`;
            }
}