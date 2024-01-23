import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Record<number, string>;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: this.initializeParamValues(props.model.paramValues),
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.model.paramValues !== this.props.model.paramValues) {
      this.setState({
        paramValues: this.initializeParamValues(this.props.model.paramValues),
      });
    }
  }

  initializeParamValues(paramValues: ParamValue[]) {
    const initialParamValues: Record<number, string> = {};
    paramValues.forEach((paramValue) => {
      initialParamValues[paramValue.paramId] = paramValue.value;
    });
    return initialParamValues;
  }

  handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  getModel = (): Model => {
    const updatedParamValues: ParamValue[] = Object.entries(this.state.paramValues).map(
        ([paramId, value]) => ({
          paramId: parseInt(paramId),
          value,
        })
    );

    return {
      paramValues: updatedParamValues,
    };
  };

  render() {
    const { params } = this.props;

    return (
        <div>
          {params.map((param) => (
              <div key={param.id}>
                <h1>{param.name}</h1>
                <input
                    type="text"
                    value={this.state.paramValues[param.id] || ''}
                    onChange={(e) => this.handleInputChange(param.id, e.target.value)}
                />
              </div>
          ))}
          <button onClick={() => console.log(this.getModel())}>Get Model</button>
        </div>
    );
  }
}

class App extends React.Component {
  render() {
    const params: Param[] = [
      {
        id: 1,
        name: 'Назначение',
        type: 'string',
      },
      {
        id: 2,
        name: 'Длина',
        type: 'string',
      },
    ];

    const model: Model = {
      paramValues: [
        {
          paramId: 1,
          value: '',
        },
        {
          paramId: 2,
          value: '',
        },
      ],
    };

    return (
        <div>
          <h1>Param Editor</h1>
          <ParamEditor params={params} model={model} />
        </div>
    );
  }
}

export default App;
