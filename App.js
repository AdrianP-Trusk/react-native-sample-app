import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import AppTitle from './components/AppTitle';
import FormWrapper from './components/FormWrapper';
import Select from './components/Select';
import Checkbox from './components/Checkbox';
import Spinner from './components/Spinner';
import SetupProposal from './components/SetupProposal';
import Button from './components/Button';

const stackOptions = [{
  key: '0',
  label: 'Choose...',
  value: '',
}, {
  key: '1',
  label: 'Node.js',
  value: 'node-js',
}, {
  key: '2',
  label: 'JAVA',
  value: 'java',
}, {
  key: '3',
  label: 'Python',
  value: 'python',
}];

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  const [devStack, setDevStack] = useState('');
  const [mustAPI, setMustAPI] = useState(false);
  const [mustWEB, setMustWEB] = useState(false);
  const [mustMOBILE, setMustMOBILE] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [proposalStack, setProposalStack] = useState('');
  const [proposalToolTest, setProposalToolTest] = useState('');
  const [proposalToolAPI, setProposalToolAPI] = useState('');
  const [proposalToolWEB, setProposalToolWEB] = useState('');
  const [proposalToolMOBILE, setProposalToolMOBILE] = useState('');
  const [proposalToolBONUS, setProposalToolBONUS] = useState('');

  const showSubmit = devStack !== '' &&
      (mustAPI || mustWEB || mustMOBILE) && !isSubmitted;
  const showProposal = proposalStack !== '' && isSubmitted;

  console.log('State reloaded', {
    devStack,
    mustAPI,
    mustWEB,
    mustMOBILE,
    isLoading,
    proposalStack,
    proposalToolTest,
    proposalToolAPI,
    proposalToolWEB,
    proposalToolMOBILE,
    proposalToolBONUS,
    showSubmit,
    isSubmitted,
    showProposal,
  });

  /**
   *
   * @param {?} params
   */
  function onChangeDevStackSelectionHandler(params) {
    console.log('on change dev stack choice', params);
    setDevStack(params);
  }

  /**
   *
   * @param {?} params
   */
  function toggleMustAPIHandler(params) {
    console.log('toggle must api', params);
    setMustAPI(params);
  }

  /**
   *
   * @param {?} params
   */
  function toggleMustWEBHandler(params) {
    console.log('toggle must web', params);
    setMustWEB(params);
  }

  /**
   *
   * @param {?} params
   */
  function toggleMustMOBILEHandler(params) {
    console.log('toggle must mobile', params);
    setMustMOBILE(params);
  }

  /**
   *
   */
  function makeProposal() {
    setProposalStack(devStack);

    setProposalToolTest({
      'node-js': 'jest',
      'java': 'testng',
      'python': 'pytest',
    }[devStack]);

    if (mustAPI) {
      setProposalToolAPI({
        'node-js': 'axios',
        'java': 'rest-assured',
        'python': 'requests',
      }[devStack]);
    }

    if (mustWEB) {
      setProposalToolWEB({
        'node-js': 'webdriverio',
        'java': 'selenium-webdriver',
        'python': 'selenium-webdriver',
      }[devStack]);
    }

    if (mustMOBILE) {
      setProposalToolMOBILE({
        'node-js': 'webdriverio',
        'java': 'appium',
        'python': 'appium',
      }[devStack]);
    }

    setProposalToolBONUS({
      'node-js': 'cucumber-js',
      'java': 'cucumber',
      'python': 'behave',
    }[devStack]);
  }

  /**
   *
   */
  function submitHandler() {
    console.log('submit');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      makeProposal();
    }, 3000);
  }

  /**
   *
   */
  function resetHandler() {
    console.log('reset');
    setDevStack('');
    setIsLoading(false);
    setIsSubmitted(false);
    setMustAPI(false);
    setMustWEB(false);
    setMustMOBILE(false);
    setProposalStack('');
    setProposalToolTest('');
    setProposalToolAPI('');
    setProposalToolWEB('');
    setProposalToolMOBILE('');
    setProposalToolBONUS('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AppTitle>Automation Project POC</AppTitle>

        <FormWrapper>
          <Select
            label="Developers tech stack"
            onChangeSelected={onChangeDevStackSelectionHandler}
            options={stackOptions}
            selected={devStack}
            testLabel="choose stack"
          />

          <View style={styles.checkboxes}>
            <Checkbox
              label="API testing"
              onToggle={toggleMustAPIHandler}
              value={mustAPI}
              testLabel="choose api"
            />
            <Checkbox
              label="Web testing"
              onToggle={toggleMustWEBHandler}
              value={mustWEB}
              testLabel="choose web"
            />
            <Checkbox
              label="Mobile testing"
              onToggle={toggleMustMOBILEHandler}
              value={mustMOBILE}
              testLabel="choose mobile"
            />
          </View>
        </FormWrapper>

        {isLoading && (
          <Spinner
            testLabel="spinnerapi"
          />
        )}

        {(!isLoading && showSubmit) && (
          <View style={styles.action}>
            <Button
              label="Submit"
              onPress={submitHandler}
              testLabel="submit"
            />
          </View>
        )}

        {(!isLoading && showProposal) && (
          <View style={styles.proposal}>
            <SetupProposal
              proposalStack={proposalStack}
              proposalToolTest={proposalToolTest}
              proposalToolAPI={proposalToolAPI}
              proposalToolWEB={proposalToolWEB}
              proposalToolMOBILE={proposalToolMOBILE}
              proposalToolBONUS={proposalToolBONUS}
            />
            <Button
              label="Reset"
              onPress={resetHandler}
              testLabel="reset"
            />
          </View>
        )}

      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

App.propTypes = {

};

const styles = StyleSheet.create({
  action: {
    flex: 1,
  },
  checkboxes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proposal: {
    flex: 1,
    padding: 8,
  },
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
});
