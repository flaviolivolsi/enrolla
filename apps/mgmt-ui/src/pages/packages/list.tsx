import { useTable, ColumnDef } from '@pankod/refine-react-table';
import {
  Group,
  List,
  ScrollArea,
  ShowButton,
  DeleteButton,
  DateField,
  Card,
  Text,
  createStyles,
  SimpleGrid,
  EditButton,
} from '@pankod/refine-mantine';
import { useMemo } from 'react';
import {
  PackageIcon,
  PredefinedIcon,
} from '../../components/packages/PackageIcon';
import { Package } from '@enrolla/graphql-codegen';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

export const PackageList: React.FC = () => {
  const columns = useMemo<ColumnDef<Package>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
      },
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
      },
      {
        id: 'description',
        header: 'Description',
        accessorKey: 'description',
      },
      {
        id: 'icon',
        header: 'Icon',
        accessorKey: 'icon',
      },
      {
        id: 'parentPackageId',
        header: 'Parent Package',
        accessorKey: 'parentPackageId',
        cell: function render({ getValue, table }) {
          const parentPackage: Package | undefined = table.options.data.find(
            (item) => item.id === getValue()
          );
          return parentPackage?.name ?? '-';
        },
      },
      {
        id: 'createdAt',
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as number} />
              <DeleteButton hideText recordItemId={getValue() as number} />
            </Group>
          );
        },
      },
    ],
    []
  );

  const { getRowModel } = useTable({
    columns,
    refineCoreProps: {
      metaData: {
        fields: ['id', 'name', 'description', 'icon'],
      },
    },
  });

  const { classes } = useStyles();

  return (
    <ScrollArea>
      <List>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { maxWidth: 'lg', cols: 2 },
            { maxWidth: 'xl', cols: 3 },
          ]}
          my={10}
        >
          {getRowModel().rows.map((row, index) => {
            return (
              <Card
                style={{ minHeight: 200 }}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                key={row.id}
              >
                <Card.Section className={classes.section}>
                  <Group>
                    <PackageIcon
                      icon={row.getValue('icon') ?? PredefinedIcon.Box}
                    />
                    <Text mt="md" mb="xs" size="xl" weight={500}>
                      {row.getValue('name') as string}
                    </Text>
                  </Group>
                  <Text size="sm" style={{ minHeight: 50 }} color="dimmed">
                    {row.getValue('description') as string}
                  </Text>
                </Card.Section>
                <Group mt="lg">
                  <ShowButton
                    hideText
                    recordItemId={row.getValue('id') as string}
                  />
                  <EditButton
                    hideText
                    recordItemId={row.getValue('id') as number}
                  />
                  <DeleteButton
                    hideText
                    recordItemId={row.getValue('id') as string}
                  />
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      </List>
    </ScrollArea>
  );
};
