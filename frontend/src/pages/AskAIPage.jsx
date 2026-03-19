import {useEffect, useState} from "react";

import styles from "../styles/AIPage.module.css";
import AIHeroPrompts from "../components/ai-hero-prompts";
import AITextInput from "../components/ai-text-input";

export default function AIAssistant() {

    const [ loading, setLoading ] = useState(false);
    const [ showHero, setShowHero ] = useState(false);
    const [ query, setQuery ] = useState('');
    const [ recomendations, setRecommendations ] = useState([]);

    useEffect(() => {
        async function getRecommendations() {
            try {
                const response = await fetch('http://localhost/bookmart/backend/recommend.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to generate recommendations');
                }

                const result = await response.json();
                if (result.status === 'error') {
                    alert("An error occured");
                    console.log(result.message);
                } else {
                    setRecommendations(result);
                }
            } catch (err) {
                alert("An error occured.");
            } finally {
                setLoading(false);
            }
        }

        getRecommendations();
    }, []);

    return(
        <div className={styles.AI_page}>
            <div className={styles.content}>
                <AIHeroPrompts />
            </div>
            <AITextInput/>
        </div>
    )
}