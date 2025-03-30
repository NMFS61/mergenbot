'use client';
import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
} from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
type Color = 'blue' | 'green';

type ExtendedTreeItemProps = {
  color?: Color;
  id: string;
  label: string;
};

const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  { id: '1', label: 'Dashboard', color: 'blue' },
  { id: '2', label: 'Study area', color: 'green' },
//   {
//     id: '2',
//     label: 'Studies',
//     children: [
//       { id: '2.1', label: 'Study1', color: 'green' },
//       {
//         id: '2.2',
//         label: 'Ready',
//         children: [
//           { id: '2.2.1', label: 'Dropby', color: 'blue' },
//           { id: '2.2.2', label: 'Volatility', color: 'blue' },
//         ],
//       },
//     ],
//   },
  {
    id: '3',
    label: 'Market Data',
    children: [
      {
        id: '3.1',
        label: 'US Stocks',
        children: [
          { id: '3.1.1', label: 'NASDAQ 100', color: 'blue' },
          { id: '3.1.2', label: 'NYSE 100', color: 'blue' },
          { id: '3.1.3', label: 'NYSE 200', color: 'blue' },
        ],
      },
      {
        id: '3.2',
        label: 'UK Stocks',
        children: [
          { id: '3.2.1', label: 'FTSE 100', color: 'blue' },
          { id: '3.2.2', label: 'FTSE 250', color: 'blue' },
        ],
      },
      {
        id: '3.3',
        label: 'Turkish Stocks',
        children: [
          { id: '3.3.1', label: 'BIST 30', color: 'blue' },
          { id: '3.3.2', label: 'BIST 50', color: 'blue' },
          { id: '3.3.3', label: 'BIST 100', color: 'blue' },
        ],
      },
      { id: '3,4', label: 'FOREX', color: 'blue' },
      { id: '3,5', label: 'Dividend Data(all)', color: 'blue' },
      
      
    ],
  },
  
];

function DotIcon({ color }: { color: string }) {
  return (
    <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
      <svg width={6} height={6}>
        <circle cx={3} cy={3} r={3} fill={color} />
      </svg>
    </Box>
  );
}

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

interface CustomLabelProps {
  children: React.ReactNode;
  color?: Color;
  expandable?: boolean;
}

function CustomLabel({ color, expandable, children, ...other }: CustomLabelProps) {
  const theme = useTheme();
  const colors = {
    blue: (theme.vars || theme).palette.primary.main,
    green: (theme.vars || theme).palette.success.main,
  };

  const iconColor = color ? colors[color] : null;
  return (
    <TreeItem2Label {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {iconColor && <DotIcon color={iconColor} />}
      <Typography className="labelText" variant="body2" sx={{ color: 'text.primary' }}>
        {children}
      </Typography>
    </TreeItem2Label>
  );
}

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const color = item?.color;
  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <TreeItem2Content
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
              disabled: status.disabled,
            }),
          })}
        >
          {status.expandable && (
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
          )}

          <CustomLabel {...getLabelProps({ color })} />
        </TreeItem2Content>
        {children && (
          <TransitionComponent {...getGroupTransitionProps({ className: 'groupTransition' })} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

const handleSelectedItemsChange = (event: React.SyntheticEvent, ids: string[]) => {
    console.log(ids);
}
export default function SidebarHome() {
    const router = useRouter();
    const handleClick = (event: string) => {
        console.log(event);
        if(event==="Dashboard") {router.push('/dashboard');}
        if(event==="Study area") {router.push('/studies');}
        if(event==="NASDAQ 100") {router.push('/market/NASDAQ100');}
        if(event==="NYSE 100") {router.push('/market/NYSE100');}
        if(event==="NYSE 200") {router.push('/market/NYSE200');}
        if(event==="FTSE 100") {router.push('/market/FTSE100');}
        if(event==="FTSE 250") {router.push('/market/FTSE250');}
        if(event==="BIST 30") {router.push('/market/BIST30');}
        if(event==="BIST 50") {router.push('/market/BIST50');}
        if(event==="BIST 100") {router.push('/market/BIST100');}
        if(event==="FOREX") {router.push('/market/FOREX');}
        if(event==="Dividend Data(all)") {router.push('/market/dividend');}
        
        };

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Menu
        </Typography>
        <RichTreeView
          items={ITEMS}
          aria-label="pages"
          multiSelect
          defaultExpandedItems={['1', '1.1']}
          defaultSelectedItems={['1.1', '1.1.1']}
          sx={{
            m: '0 -8px',
            pb: '8px',
            height: 'fit-content',
            flexGrow: 1,
            overflowY: 'auto',
          }}
          slots={{ item: CustomTreeItem }}
          onClick={(event) => {const e=event.target as HTMLElement; handleClick(e.innerText);}}
          onSelectedItemsChange={handleSelectedItemsChange}
        />
      </CardContent>
    </Card>
  );
}
