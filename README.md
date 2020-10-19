# The Trrack Provenance Tracking Library

Trrack is a library to create and track provenance (history) in web-based apps. Trrack allows you to create and maintain a non-linear provenance graph representing the history of the state of your visualization. Through this graph, you can easily implement complete action recovery, as well as store custom metadata and annotations.

![Overview of applications implementing the trrack library, and the trrack provenance visualization](trrack_overview.png)

Trrack also allows for easy sharing of a visualization's current state through URL sharing. To share entire session history, Trrack allows for the import and exporting of provenance graphs, as well as has built in integration with firebase to store the graphs.

For full documentation, see http://vdl.sci.utah.edu/trrack-examples/api/trrack

## Features

- Power you application to track user interactions or changes
- Enable undo/redo functionality
- Easy state sharing through a URL
- Track changes in non-linear manner with branches
- Add custom metadata and annotations to each node in the graph
- Built in Firebase support for storing large graphs
- Simple API
- Full Typescript support

Also check out [the paper](https://doi.org/10.31219/osf.io/wnctb) to learn about the design philosophy.

If you're using Trrack in an academic project, please cite:

```
Z. T. Cutler, K. Gadhaveand A. Lex, “Trrack: A Library for Provenance Tracking in Web-Based Visualizations”, osf.io preprint. https://doi.org/10.31219/osf.io/wnctb.
```

## Companion Library

Trrack does back-end history management only. If you want to use the history/provenance visualization as well, check out the [trrack-vis library](https://github.com/visdesignlab/trrack-vis), which is designed to provide a customizable front-end for the Trrack library.


## Examples

Here are some examples showing you how to get started:

 * [Basic Usage](https://github.com/visdesignlab/trrack-examples) using provenance with typescript and d3.
 * [A slightly more advanced example](https://github.com/visdesignlab/provenance-lib-core-demo) application using provenance. Also demonstrates how to import and export the current state of an application.



Here are example of a few complex system susing Trrack:

 * The [Intent System](https://github.com/visdesignlab/intent-system) is a tool for predicting user intent patterns when brushing in scatterplots. The intent system utilizes the provenance library to control all interaction, as well as the ProvVis library to visualize the resulting provenance graph.
 * [BloodVis](https://github.com/visdesignlab/bloodvis) visualizes blood product usage and outcomes in surgical procedures.
 * The [Workforce Project](http://vdl.sci.utah.edu/workforce-frontend/) ([Code](https://github.com/visdesignlab/workforce-frontend)) visualizes a model for predicting workforce needs in the medical sector in Utah.


## Installation

- NPM

```bash
npm install --save-dev @visdesignlab/trrack
```

- Yarn

```bash
yarn add @visdesignlab/trrack
```

## Usage

To use Trrack, your application has to be explicit about state: any action that you want to track has to be captured as part of a state that you pass to the Trrack library.


![Overview of how Trrack integrates with client software.](trrack_architecture.png)


### Sharing a State Through a URL Parameter

Trrack allows instant sharing of state via URL parameter. State sharing is turned on by default, and the only setup required is to call [done](http://vdl.sci.utah.edu/trrack-examples/api/trrack/interfaces/provenance.html#done) after you have finished creating observers and loading data, telling trrack it can import the URL state. When turned on, changing the state of your application will automatically update the URL parameter. Pasting the entire URL into a different web browser will import the state automatically.

### Integrating with Trrack-VIS for provenance visualization

The graph which Trrack creates and utilizes may be visualized using [Trrack-Vis](https://github.com/visdesignlab/trrack-vis). Trrack-Vis has default icons associated with the event type object, the [second](http://vdl.sci.utah.edu/trrack-examples/api/trrack/interfaces/provenance.html) generic parameter (S) passed to Trrack. To use Trrack-Vis in a javascript environment, you will need to import and use the ProvVisCreator function. See [this simple example] (https://github.com/visdesignlab/trrack-examples/blob/master/examples/simpleExample/src/provenanceSetup.ts) for how to set up Trrack-Vis with default functionality. For further documentation and a list of customizable parameters that can be passed to Trrack-Vis, see http://vdl.sci.utah.edu/trrack-examples/api/trrack-vis/interfaces/provvisconfig.html

### Integrating with FireBase and Other Servers

To integrate FireBase with Trrack, you first need to set up a [Firebase](https://firebase.google.com/docs/database) project. Once you've done so, navigate to Settings -> Project settings -> general, and you should find a "firebaseConfig" object on that page. That exact object will be passed into [initProvenance](http://vdl.sci.utah.edu/trrack-examples/api/trrack/globals.html#initprovenance). Once done, Trrack will automatically store all created nodes to your Firebase project.

To utilize Trrack with other servers, you will use [exportProvenanceGraph](http://vdl.sci.utah.edu/trrack-examples/api/trrack/interfaces/provenance.html#exportprovenancegraph) to export the entire graph json and [importProvenanceGraph](http://vdl.sci.utah.edu/trrack-examples/api/trrack/interfaces/provenance.html#importprovenancegraph) to import the same json file.
