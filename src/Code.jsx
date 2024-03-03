import { useEffect } from "./lluis.js";
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/components/prism-jsx';
import "./assets/dracula-prism.css";

const Code = () => {
    const files   = process.env.FILES;

    useEffect(() => {
        const importAndDisplayFileContent = async () => {
            const response = await fetch("src/Count.jsx")
            const str = await response.text();

            const highlightedCode = Prism.highlight(str, Prism.languages.jsx, 'jsx');
                        
            const lang = document.querySelector('.language-jsx');
            lang.innerHTML = highlightedCode;
        };
        importAndDisplayFileContent()
    }, [])

    return (
        <div className="code">
            <pre className="language-jsx line-numbers" data-line="2">
                <code className="language-jsx" />
            </pre>
        </div>
    )
}

export default Code