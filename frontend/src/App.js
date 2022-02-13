import React, {useState, useEffect} from 'react';
import'./App.css';
import api from './services/api';
import Header from './components/Hedader';

function App() {
    const [projects, setProjects] = useState([]);
    // useState retorna um array com 2 posições
    // 1. Variável com o seu valor inicial
    // 2. Função para atualixarmos esse valor

    useEffect(() =>{
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);
    async function handleAddProject(){
        //projects.push(`Novo projeto ${Date.now()}`);

        //setProjects([...projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}` ,
            owner: "Samuel Mateus"
        });

        //console.log(projects);
        const project = response.data;

        setProjects([...projects, project]);
    }
    return (
    <>
    <Header title="Projecs"/>
    <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar Projetos</button>
    </>
   
    );
}

export default App;