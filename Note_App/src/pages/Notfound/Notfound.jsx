import React from 'react'
import "./Notfound.scss"
import Parallax from 'parallax-js';
// then instantiate inside useEffect with new Parallax(sceneRef.current, {...})

const Notfound = () => {
    const sceneRef = React.useRef(null);

    React.useEffect(() => {
        // Dynamically import to avoid SSR issues and load the library only on client
        let parallaxInstance;
        if (sceneRef.current) {
            import('parallax-js').then(({ default: Parallax }) => {
                parallaxInstance = new Parallax(sceneRef.current, { hoverOnly: false });
            }).catch(() => {
                // ignore if library not available; install with `npm install parallax-js` if needed
            });
        }

        return () => {
            if (parallaxInstance && typeof parallaxInstance.disable === 'function') {
                parallaxInstance.disable();
            }
        };
    }, []);

    return (
        <>
            <section className="wrapper">

                <div className="container">

                    <div id="scene" ref={sceneRef} className="scene" data-hover-only="false">


                        <div className="circle" data-depth="1.2"></div>

                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece" />
                                <span className="piece" />
                                <span className="piece" />
                            </div>
                        </div>

                        <div className="two" data-depth="0.60">
                            <div className="content">
                                <span className="piece" />
                                <span className="piece" />
                                <span className="piece" />
                            </div>
                        </div>

                        <div className="three" data-depth="0.40">
                            <div className="content">
                                <span className="piece" />
                                <span className="piece" />
                                <span className="piece" />
                            </div>
                        </div>

                        <p className="p404" data-depth="0.50">404</p>
                        <p className="p404" data-depth="0.10">404</p>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Notfound