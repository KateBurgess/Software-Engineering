import firebase from 'firebase/app';
import { ProvenanceGraph } from '../Types/ProvenanceGraph';

import 'firebase/database';

export function initializeFirebase(config: any) {
  const app: firebase.app.App = firebase.apps.length === 0
    ? firebase.initializeApp(config)
    : firebase.app();

  const db = firebase.database(app);

  return {
    config,
    app,
    db,
  };
}

export function logToFirebase(rtd: firebase.database.Database) {
  const addedNodes: string[] = [];

  return (graph: ProvenanceGraph<any, any, any>) => {
    const path = `${graph.root}`;
    const nodes = Object.keys(graph.nodes);
    const nodeToAdd: string[] = [];

    nodes.forEach((node) => {
      if (!addedNodes.includes(node)) {
        nodeToAdd.push(node);
        addedNodes.push(node);
      }
    });

    nodeToAdd.forEach((node) => {
      const actualNode = JSON.parse(JSON.stringify(graph.nodes[node]));

      rtd
        .ref(`${path}/nodes/${node}`)
        .set(actualNode)
        .catch((err) => {
          console.log(err);
          throw new Error('Something went wrong while logging.');
        });
    });
  };
}
