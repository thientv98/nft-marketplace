import { trans } from "@/utils";
import { Group, ThumbUp, Token, Topic } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface ItemDashboardProps {
  data: any
}

export const ItemDashboard = (props: ItemDashboardProps) => {
  const { data } = props

  let icon = <Group />
  let bgColor = "#009ef7";

  switch (data.key) {
    case 'totalStakeToken':
      icon = <Token />
      bgColor = "#50cd89";
      break
    case 'totalPost':
      icon = <Topic />
      bgColor = "#7239ea";

      break
    case 'totalVote':
      icon = <ThumbUp />
      bgColor = "#181c32";
      break
    default:
      icon = <Group />
      bgColor = "#009ef7";
  }

  return (
    <Card
      sx={{
        backgroundColor: bgColor,
      }}
      className='card-dashboard'
    >
      <CardContent >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              mr: 2,
              alignSelf: 'flex-start',
              '& svg': {
                display: 'block',
                color: '#fff',
                width: { xs: 'auto', lg: 50, xl: 'auto' },
              },
            }}
          >
            {icon}
          </Box>
          <Box
            sx={{
              flex: 1,
              color: 'white',
            }}
          >
            <Typography
              component='h3'
              variant='inherit'
              sx={{
                color: 'inherit',
              }}
            >
              {data.value}
            </Typography>
            <Box
              sx={{
                mt: 0.5,
              }}
            >
              {trans(data.key)}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
