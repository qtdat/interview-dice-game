import { useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-json';

type JsonViewerProps = {
  data: unknown,
};

export default function JsonView({ data = {} } : JsonViewerProps) {
  const uid = useMemo(() => nanoid(5), []);
  const jsonString = JSON.stringify(data, null, 2);

 return (
   <AceEditor
     mode='json'
     theme='github'
     value={jsonString}
     name={uid}
     fontSize={14}
     tabSize={2}
     width='100%'
     editorProps={{ $blockScrolling: true }}
     readOnly={true}
     setOptions={{ useWorker: false }}
   />
 );
}
