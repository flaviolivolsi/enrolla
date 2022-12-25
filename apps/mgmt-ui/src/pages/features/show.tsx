import { Prism } from '@mantine/prism';
import { useShow } from '@pankod/refine-core';
import { Show, Title, Text } from '@pankod/refine-mantine';

import { IFeature } from '../../interfaces';

export const FeatureShow: React.FC = () => {
  const { queryResult } = useShow<IFeature>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Key</Title>
      <Text mt="xs">{record?.key}</Text>

      <Title mt="xs" order={5}>
        Description
      </Title>
      <Text mt="xs">{record?.description}</Text>

      <Title mt="xs" order={5}>
        Type
      </Title>
      <Text mt="xs">{record?.type}</Text>

      <Title mt="xs" order={5}>
        Default Value
      </Title>
      {record?.type === 'JSON' ? (
        <Prism language="json" noCopy>
          {record &&
            JSON.stringify(record?.defaultValue.value as object, null, 2)}
        </Prism>
      ) : (
        <Text mt="xs">
          {record && JSON.stringify(record?.defaultValue.value)}
        </Text>
      )}
    </Show>
  );
};
